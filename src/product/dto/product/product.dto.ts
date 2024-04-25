import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isFloat64Array } from 'util/types';

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    TenSanPham: string;

    @IsNotEmpty()
    GiaBan: number;

    @IsString()
    @IsNotEmpty()
    AnhSanPham: string;

    @IsString()
    @IsNotEmpty()
    MoTaSanPham: string;

    @IsString()
    @IsNotEmpty()
    ThuongHieu: string;
    constructor(TenSanPham: string, GiaBan: number, AnhSanPham: string, MoTaSanPham: string, ThuongHieu: string) {
        this.TenSanPham = TenSanPham;
        this.GiaBan = GiaBan;
        this.AnhSanPham = AnhSanPham;
        this.MoTaSanPham = MoTaSanPham;
        this.ThuongHieu = ThuongHieu;
    }

    setTenSanPham(tenSanPham: string) {
        this.TenSanPham = tenSanPham;
    }

    setGiaBan(giaBan: number) {
        this.GiaBan = giaBan;
    }
    setAnhSanPham(anhSanPham: string) {
        this.AnhSanPham = anhSanPham;
    }
    setMoTaSanPham(moTaSanPham: string) {
        this.MoTaSanPham = moTaSanPham;
    }
    setThuongHieu(thuongHieu: string) {
        this.ThuongHieu = thuongHieu;
    }
}