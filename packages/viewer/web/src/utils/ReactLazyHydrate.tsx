/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore

import React from 'react';

export type LazyProps = {
  ssrOnly?: boolean;
  whenIdle?: boolean;
  whenVisible?: boolean;
  noWrapper?: boolean;
  didHydrate?: VoidFunction;
  promise?: Promise<any>;
  isBrowser: boolean;
  on?: (keyof HTMLElementEventMap)[] | keyof HTMLElementEventMap;
};

type Props = Omit<React.HTMLProps<HTMLDivElement>, 'dangerouslySetInnerHTML'> & LazyProps;

type VoidFunction = () => void;

const event = 'hydrate';

// React currently throws a warning when using useLayoutEffect on the server.

function LazyHydrate(props: Props) {
  const childRef = React.useRef<HTMLDivElement>(null);

  // Always render on server
  const [hydrated, setHydrated] = React.useState(!props.isBrowser);
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);

  const {
    noWrapper,
    isBrowser,
    ssrOnly,
    whenIdle,
    whenVisible,
    promise, // pass a promise which hydrates
    on = [],
    children,
    didHydrate, // callback for hydration
    ...rest
  } = props;

  if (!ssrOnly && !whenIdle && !whenVisible && !on.length && !promise) {
    console.error(
      `LazyHydration: Enable atleast one trigger for hydration.\n If you don't want to hydrate, use ssrOnly`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let io: any;
  const constructor = () => {
    if (constructorHasRun) {
      return;
    }
    io =
      isBrowser && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                  entry.target.dispatchEvent(new CustomEvent(event));
                }
              });
            },
            {
              rootMargin: '250px',
            }
          )
        : null;
    setConstructorHasRun(true);
  };

  constructor();

  const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;
  useIsomorphicLayoutEffect(() => {
    // No SSR Content
    // @ts-ignore
    if (!childRef.current.hasChildNodes()) {
      setHydrated(true);
    }
  }, []);

  React.useEffect(() => {
    if (ssrOnly || hydrated) {
      return;
    }
    const cleanupFns: VoidFunction[] = [];
    function cleanup() {
      // eslint-disable-next-line fp/no-loops
      while (cleanupFns.length) {
        // @ts-ignore
        cleanupFns.pop()();
      }
    }
    function hydrate() {
      setHydrated(true);
      if (didHydrate) {
        didHydrate();
      }
    }

    if (promise) {
      promise.then(hydrate).catch(hydrate);
    }

    if (whenIdle) {
      // @ts-ignore
      if (typeof requestIdleCallback !== 'undefined') {
        // @ts-ignore
        const idleCallbackId = requestIdleCallback(hydrate, { timeout: 500 });
        cleanupFns.push(() => {
          // @ts-ignore
          cancelIdleCallback(idleCallbackId);
        });
      } else {
        const id = setTimeout(hydrate, 2000);
        cleanupFns.push(() => {
          clearTimeout(id);
        });
      }
    }

    const events = Array.isArray(on) ? on.slice() : [on];

    if (whenVisible) {
      //@ts-ignore
      if (io && childRef.current.childElementCount) {
        // As root node does not have any box model, it cannot intersect.
        // @ts-ignore
        const el = childRef.current.children[0];
        io.observe(el);
        events.push(event as keyof HTMLElementEventMap);

        cleanupFns.push(() => {
          io.unobserve(el);
        });
      } else {
        return hydrate();
      }
    }

    events.forEach(_event => {
      //@ts-ignore
      childRef.current.addEventListener(_event, hydrate, {
        once: true,
        capture: true,
        passive: true,
      });
      cleanupFns.push(() => {
        //@ts-ignore
        childRef.current.removeEventListener(_event, hydrate, { capture: true });
      });
    });

    return cleanup;
  }, [hydrated, on, ssrOnly, whenIdle, whenVisible, didHydrate, promise]);

  if (hydrated) {
    if (noWrapper) {
      return children;
    }
    return (
      <div ref={childRef} style={{ display: 'contents' }} {...rest}>
        {children}
      </div>
    );
  } else {
    return (
      <div
        ref={childRef}
        style={{ display: 'contents' }}
        suppressHydrationWarning
        {...rest}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: '' }}
      />
    );
  }
}

export default LazyHydrate;
