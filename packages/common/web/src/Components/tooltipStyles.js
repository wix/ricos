export const getTooltipStyles = (type, effect, tooltipOffset, place) => {
  return {
    style: {
      background: type === 'error' ? '#BE6464' : 'rgba(0,0,0,.8)',
      position: effect === 'float' ? 'relative' : 'absolute',
      padding: '8px 21px',
      color: 'white',
      fontWeight: '300',
      fontFamily: 'Helvetica',
      maxWidth: '180px',
      fontSize: '13px',
      marginTop: place === 'top' ? Math.abs(tooltipOffset.y) : tooltipOffset.y,
      pointerEvents: 'none',
      transition: 'none',
    },
    arrowStyle: {
      color: type === 'error' ? '#BE6464' : 'rgba(0,0,0,.8)',
      borderColor: false,
      pointerEvents: 'none',
      transition: 'none',
    },
  };
};
