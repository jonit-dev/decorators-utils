export function DecorateAllWith(decorator: MethodDecorator): ClassDecorator {
  return function (constructor: Function) {
    // Get the prototype of the class
    const prototype = constructor.prototype;
    // Get all property names of the class
    const propertyNames = Object.getOwnPropertyNames(prototype);
    // Loop over all property names
    propertyNames.forEach((propertyName) => {
      // If the property is a function (but not the constructor)
      if (
        propertyName !== 'constructor' &&
        typeof prototype[propertyName] === 'function'
      ) {
        // Get the descriptor of the method
        const descriptor = Object.getOwnPropertyDescriptor(
          prototype,
          propertyName
        );
        // Decorate the method
        const newDescriptor =
          // @ts-ignore
          decorator(prototype, propertyName, descriptor) || descriptor;
        // Replace the method with the decorated method
        // @ts-ignore
        Object.defineProperty(prototype, propertyName, newDescriptor);
      }
    });
  };
}
