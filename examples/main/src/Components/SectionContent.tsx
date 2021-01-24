import React, { ReactNode, Suspense } from 'react';

const SectionContent = React.memo<{
  isLoadedLazily?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}>(
  ({
    children,
    isLoadedLazily = true,
    fallback = <div className="placeholder">Loading...</div>,
  }) => (
    <div className="content">
      {isLoadedLazily ? <Suspense fallback={fallback}>{children}</Suspense> : children}
    </div>
  )
);

export default SectionContent;
