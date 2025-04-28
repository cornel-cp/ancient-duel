export class sceneStack {
  static sceneStack = [];

  static pushScene(sceneKey, position) {
    this.sceneStack.push({ scene: sceneKey, position });
  }

  static popScene(){
    return this.sceneStack.pop();
  }

  static peekScene(){
    return this.sceneStack[this.sceneStack.length - 1]; // Check last scene without removing
  }

  static resetStack() {
    this.sceneStack = [];
  }

  static getStack() {
    return [...this.sceneStack]; // Return a copy of the stack
  }
}
