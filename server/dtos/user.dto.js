export class UserDto {
  id;
  email;
  diskSize;
  usedDiskSpace;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.diskSize = model.diskSize;
    this.usedDiskSpace = model.usedDiskSpace;
  }
}
