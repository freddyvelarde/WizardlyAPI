class Db {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public printName() {
    return this.name + ", hwlllo";
  }
}
export default new Db("fred");
