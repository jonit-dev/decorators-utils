export function ClassLogger(): ClassDecorator {
  return function (constructor: Function) {
    const prototype = constructor.prototype;
    const propertyNames = Object.getOwnPropertyNames(prototype);

    propertyNames.forEach((propertyName) => {
      // @ts-ignore
      if (
        propertyName !== 'constructor' &&
        typeof prototype[propertyName] === 'function'
      ) {
        const isPrivate = propertyName.startsWith('_');
        const descriptor = Object.getOwnPropertyDescriptor(
          prototype,
          propertyName
        );

        const newDescriptor: PropertyDescriptor = {
          value: function (...args: any[]) {
            const indent = isPrivate ? '    ' : '';
            console.log(
              `${indent}Running ${propertyName} with arguments:`,
              args
            );
            return descriptor!.value!.apply(this, args);
          },
        };

        Object.defineProperty(prototype, propertyName, newDescriptor);
      }
    });
  };
}
