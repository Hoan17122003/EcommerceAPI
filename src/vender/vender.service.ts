import { Injectable, Inject, Global, NotFoundException } from '@nestjs/common';
import { NguoiBanHangEntity, TaiKhoanEntity } from 'src/database/Entity/index.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/database/base.service';
import { NguoiBanHangRepository } from 'src/database/Repository/NguoiBanHang.repository';
import { VenderDTO } from './dto/vender.dto';
import { ProductService } from 'src/product/product.service';
import { DiscountCodeService } from 'src/discountcode/discountcode.service';
import { DiscountCodeDetailService } from 'src/discountcodedetail/discountcodedetail.service';
import { MaGiamGiaDTO } from 'src/discountcode/dto/MaGiamGia.dto';
import { dataSource } from 'src/database/database.providers';

@Injectable()
export class VenderService extends BaseService<NguoiBanHangEntity, NguoiBanHangRepository> {
    constructor(@Inject('NGUOIBANHANG_REPOSITORY') private readonly nguoiBanHangRepository: NguoiBanHangRepository) {
        super(nguoiBanHangRepository);
    }

    // constructor(repository: NguoiBanHangRepository) {
    //     super(repository)
    // }

    async create(nguoiBanHang: VenderDTO, taiKhoan: TaiKhoanEntity): Promise<NguoiBanHangEntity> {
        const nguoiBanHangEntity: NguoiBanHangEntity = new NguoiBanHangEntity();
        nguoiBanHangEntity.HoDem = nguoiBanHang.HoDem;
        nguoiBanHangEntity.Ten = nguoiBanHang.Ten;
        nguoiBanHangEntity.SDT = nguoiBanHang.SDT;
        nguoiBanHangEntity.NgayThangNamSInh = nguoiBanHang.NgayThangNamSinh;
        nguoiBanHangEntity.DiaChi = nguoiBanHang.DiaChi;
        nguoiBanHangEntity.MaNguoiBanHang = taiKhoan.TaiKhoanId;

        return this.nguoiBanHangRepository.save(nguoiBanHangEntity, {
            reload: true,
        });
    }

    async changeInformation(id: number, data: { SDT?: string; DiaChi?: string }): Promise<number> {
        const nguoiBanHang = await this.nguoiBanHangRepository.update(id, { SDT: data.SDT, DiaChi: data.DiaChi });
        return nguoiBanHang ? 1 : 0;
    }

    getRepository() {
        return this.nguoiBanHangRepository;
    }

    async getThisData(id: number) {
        return this.findById(id);
    }

    async me(maNguoiBanHang: number): Promise<NguoiBanHangEntity> {
        return await dataSource
            .getRepository(NguoiBanHangEntity)
            .createQueryBuilder()
            .where('MaNguoiBanHang = :maNguoiBanHang', {
                maNguoiBanHang,
            })
            .getOne()
            .then((entity) => (entity ? Promise.resolve(entity) : Promise.reject('model not found')));
    }
}
