import { useRef, useEffect } from "react";

const OutsideClick = (callback) => {

    const refButton = useRef();
    const refPopover = useRef();

    useEffect(() => {
      const handleClick = (event) => {
        if(refButton.current && refButton.current.contains(event.target)) return;

        if (refPopover.current && !refPopover.current.contains(event.target)) {
            callback();
        }
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);

    return { button: refButton, popover: refPopover };
  }

  export default OutsideClick;