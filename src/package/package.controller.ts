import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  addPackage(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.addPackage(createPackageDto);
  }
  //
  // @Get()
  // findAll() {
  //   return this.packageService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.packageService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
  //   return this.packageService.update(+id, updatePackageDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.packageService.remove(+id);
  // }
}
