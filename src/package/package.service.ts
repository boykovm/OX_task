import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package } from '../schemas/package.schema';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<Package>,
  ) {}

  async addPackage(createPackageDto: CreatePackageDto): Promise<Package> {
    const createdPackage = new this.packageModel({
      packageJsonInfo: createPackageDto,
    });
    return createdPackage.save();
  }

  // create(createPackageDto: CreatePackageDto) {
  //   return 'This action adds a new package';
  // }
  //
  // findAll() {
  //   return `This action returns all package`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} package`;
  // }
  //
  // update(id: number, updatePackageDto: UpdatePackageDto) {
  //   return `This action updates a #${id} package`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} package`;
  // }
}
