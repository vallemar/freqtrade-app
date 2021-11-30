export class ObjectUtils {
  static equals(object1: any, object2: any): boolean {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }

  static clone(cloneObject: any): any {
    return JSON.parse(JSON.stringify(cloneObject));
  }
}
