import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    Relation,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
    Unique,
} from 'typeorm';
import * as argon from 'argon2';
import { TaiKhoanDTO } from 'src/account/dto/account.dto';

import { NguoiBanHangEntity, NguoiMuaHangEntity } from './index.entity';

@Entity('TaiKhoan')
export class TaiKhoan extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    TaiKhoanId: number;

    @Column({
        type: 'nvarchar',
        length: 255,
        unique: true,
    })
    TenDangNhap: string;

    @Column({
        length: 50,
    })
    TenTaiKhoan: string;

    @Column({
        length: 3000,
    })
    MatKhau: string;

    @Column({
        type: 'nvarchar',
        length: 20,
        enum: ['NguoiBanHang', 'NguoiMuaHang'],
    })
    VaiTro: string;

    @Column({
        type: 'nvarchar',
        length: 1000,
    })
    AnhDaiDien: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    Email: string;

    // @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true, default : Date.now() })
    // createdAt: Date;

    // @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true , default: Date.now()})
    // updatedAt: Date;

    @Column({
        name: 'isActive',
        type: 'bit',
        default: 0,
    })
    trangThaiTaiKhoan: number;

    @Column({
        default: null,
        type: 'nvarchar',
        length: 1000,
    })
    refreshToken: string;

    // @OneToOne(() => NguoiMuaHang, nguoiMuaHang => nguoiMuaHang.taiKhoanId)
    // nguoiMuaHang: Relation<NguoiMuaHang>;

    // @OneToOne(() => NguoiBanHang, nguoiBanHang => nguoiBanHang.taiKhoanId)
    // nguoiBanHang: Relation<NguoiBanHang>;

    @BeforeInsert()
    async hashPassword() {
        const MatKhau = await argon.hash(this.MatKhau, {
            hashLength: 200,
        });
        this.MatKhau = MatKhau;
    }

    async verifyPassword(MatKhau: string) {
        return await argon.verify(MatKhau, this.MatKhau);
    }
}
