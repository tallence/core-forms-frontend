const _createEvent = (eventName) => {
  let e;
  if (typeof (Event) === 'function') {
    e = new Event(eventName)
  } else {
    e = document.createEvent('Event');
    e.initEvent(eventName, true, true)
  }
  return e
};

export const debounceFn = (fn, delay) => {
    let timeoutID = null;
    return function() {
        clearTimeout(timeoutID);
        let args = arguments;
        let that = this;
        timeoutID = setTimeout(() => {
            fn.apply(that, args)
        }, delay)
    }
};

export const DebounceDirective = (element, bind) => {
    if (bind.value !== bind.oldValue) {
        element.oninput = debounceFn(() => {
            element.dispatchEvent(_createEvent('change'))
        }, parseInt(bind.value) || 800)
    }
};

