import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import Stepper from "bs-stepper";

import { OrganizationService } from "../../shared/services/organization.service";
import { DropdownService } from "../../shared/services/dropdown.service";
import { AuthlogService } from "../../shared/services/authlog.service";

import { alertEvent } from "../../shared/library/alert";
import { calulateAge } from "../../shared/library/date";
import { validForm } from "../../shared/library/form";

@Component({
  selector: "app-insert-organizations",
  templateUrl: "./insert-organizations.component.html",
  styleUrls: ["./insert-organizations.component.css"]
})
export class InsertOrganizationsComponent implements OnInit {
  public alertValid = false;

  public corperationForm: FormGroup;
  public addressForm: FormGroup;
  public addressContactForm: FormGroup;

  public corperationOriginForm: any;
  public addressOriginForm: any;
  public addressContactOriginForm: any;
  public notNext: any;
  public corperationId = null;
  public title = "";
  public corperationAll: any = [];

  public district: any = [];
  public province: any = [];
  public subdistrict: any = [];

  public districtContact: any = [];
  public provinceContact: any = [];
  public subdistrictContact: any = [];

  public contactList: any = [];

  private stepper: Stepper;
  private disable: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private dropdownService: DropdownService,
    private authlogService: AuthlogService
  ) {
    this.corperationForm = this.setCorperation(null);
    this.addressForm = this.setAddress(null, 1);
    this.addressContactForm = this.setAddress(null, 4);
    this.corperationId = this.activatedRoute.snapshot.paramMap.get("id");
    this.title = this.corperationId ? "แก้ไขข้อมูลองค์กร" : "เพิ่มข้อมูลองค์กร";
    this.notNext = 2;

  }

  async ngOnInit() {
    this.province = (await this.dropdownService
      .getProvinceAll()
      .toPromise()).data;
    this.provinceContact = (await this.dropdownService
      .getProvinceAll()
      .toPromise()).data;

    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true
    });

    const result = this.corperationId
      ? (await this.organizationService
        .getCorporation(this.corperationId)
        .toPromise()).data[0]
      : null;
    const resultAddress = this.corperationId
      ? (await this.organizationService
        .getcorporationaddress(this.corperationId)
        .toPromise()).data
      : null;
    this.corperationId ? await this.setLocation(resultAddress) : null;

    this.setAddressCorperation(resultAddress);

    this.contactList =
      (await this.organizationService
        .getcorporationcontact(this.corperationId)
        .toPromise()).data || [];
    this.corperationAll = (await this.organizationService
      .getOrganizationAll()
      .toPromise()).data;
    this.corperationForm = this.corperationId
      ? await this.setCorperation(result)
      : await this.setCorperation(null);

    this.corperationOriginForm = this.corperationForm.value;
    this.addressOriginForm = this.addressForm.value;
    this.addressContactOriginForm = this.addressContactForm.value;

    this.addressForm
      .get("Province")
      .valueChanges.subscribe(value => this.showDistrict(value));
    this.addressForm
      .get("District")
      .valueChanges.subscribe(value => this.showSubdistrict(value));

    this.addressContactForm
      .get("Province")
      .valueChanges.subscribe(value => this.showDistrictContact(value));
    this.addressContactForm
      .get("District")
      .valueChanges.subscribe(value => this.showSubdistrictContact(value));
  }

  public setLocation(address) {
    for (let index = 0; index < address.length; index++) {
      const element = address[index];
      if (element.TypeAddress == 1) {
        element.Province ? this.showDistrict(element.Province) : null;
        element.District ? this.showSubdistrict(element.District) : null;
      } else if (element.TypeAddress == 4) {
        element.Province ? this.showDistrictContact(element.Province) : null;
        element.District ? this.showSubdistrictContact(element.District) : null;
      }
    }
  }
  async updateLog(corperation, address, addressContact) {
    const currentMenu = "เพิ่ม/แก้ไข ข้อมูลองค์กร";
    this.corperationOriginForm.CorporationName != corperation.CorporationName
      ? await this.auditLogService(
        currentMenu,
        "ชื่อองค์กร",
        this.corperationOriginForm.CorporationName,
        corperation.CorporationName
      )
      : null;
    this.corperationOriginForm.TaxNo != corperation.TaxNo
      ? await this.auditLogService(
        currentMenu,
        "เลขประจำตัวผู้เสียภาษี",
        this.corperationOriginForm.TaxNo,
        corperation.TaxNo
      )
      : null;
    this.corperationOriginForm.Parent != corperation.Parent
      ? await this.auditLogService(
        currentMenu,
        "ภายใต้องค์กร",
        this.corperationOriginForm.Parent,
        corperation.Parent
      )
      : null;

    this.addressOriginForm.HouseNumber != address.HouseNumber
      ? await this.auditLogService(
        currentMenu,
        "เลขที่",
        this.addressOriginForm.HouseNumber,
        address.HouseNumber
      )
      : null;
    this.addressOriginForm.Road != address.Road
      ? await this.auditLogService(
        currentMenu,
        "ถนน",
        this.addressOriginForm.Road,
        address.Road
      )
      : null;
    this.addressOriginForm.Building != address.Building
      ? await this.auditLogService(
        currentMenu,
        "อาคาร",
        this.addressOriginForm.Building,
        address.Building
      )
      : null;
    this.addressOriginForm.Room != address.Room
      ? await this.auditLogService(
        currentMenu,
        "ห้อง",
        this.addressOriginForm.Room,
        address.Room
      )
      : null;
    this.addressOriginForm.Floor != address.Floor
      ? await this.auditLogService(
        currentMenu,
        "ชั้น",
        this.addressOriginForm.Floor,
        address.Floor
      )
      : null;
    this.addressOriginForm.Soi != address.Soi
      ? await this.auditLogService(
        currentMenu,
        "ตรอก/ซอย",
        this.addressOriginForm.Soi,
        address.Soi
      )
      : null;
    this.addressOriginForm.Province != address.Province
      ? await this.auditLogService(
        currentMenu,
        "จังหวัด",
        this.addressOriginForm.Province,
        address.Province
      )
      : null;
    this.addressOriginForm.District != address.District
      ? await this.auditLogService(
        currentMenu,
        "เขต/อำเภอ",
        this.addressOriginForm.District,
        address.District
      )
      : null;
    this.addressOriginForm.Subdistrict != address.Subdistrict
      ? await this.auditLogService(
        currentMenu,
        "แขวง/ตำบล",
        this.addressOriginForm.Subdistrict,
        address.Subdistrict
      )
      : null;
    this.addressOriginForm.Zipcode != address.Zipcode
      ? await this.auditLogService(
        currentMenu,
        "รหัสไปรษณีย์",
        this.addressOriginForm.Zipcode,
        address.Zipcode
      )
      : null;

    this.addressContactOriginForm.HouseNumber != addressContact.HouseNumber
      ? await this.auditLogService(
        currentMenu,
        "เลขที่",
        this.addressContactOriginForm.HouseNumber,
        addressContact.HouseNumber
      )
      : null;
    this.addressContactOriginForm.Road != addressContact.Road
      ? await this.auditLogService(
        currentMenu,
        "ถนน",
        this.addressContactOriginForm.Road,
        addressContact.Road
      )
      : null;
    this.addressContactOriginForm.Building != addressContact.Building
      ? await this.auditLogService(
        currentMenu,
        "อาคาร",
        this.addressContactOriginForm.Building,
        addressContact.Building
      )
      : null;
    this.addressContactOriginForm.Room != addressContact.Room
      ? await this.auditLogService(
        currentMenu,
        "ห้อง",
        this.addressContactOriginForm.Room,
        addressContact.Room
      )
      : null;
    this.addressContactOriginForm.Floor != addressContact.Floor
      ? await this.auditLogService(
        currentMenu,
        "ชั้น",
        this.addressContactOriginForm.Floor,
        addressContact.Floor
      )
      : null;
    this.addressContactOriginForm.Soi != addressContact.Soi
      ? await this.auditLogService(
        currentMenu,
        "ตรอก/ซอย",
        this.addressContactOriginForm.Soi,
        addressContact.Soi
      )
      : null;
    this.addressContactOriginForm.Province != addressContact.Province
      ? await this.auditLogService(
        currentMenu,
        "จังหวัด",
        this.addressContactOriginForm.Province,
        addressContact.Province
      )
      : null;
    this.addressContactOriginForm.District != addressContact.District
      ? await this.auditLogService(
        currentMenu,
        "เขต/อำเภอ",
        this.addressContactOriginForm.District,
        addressContact.District
      )
      : null;
    this.addressContactOriginForm.Subdistrict != addressContact.Subdistrict
      ? await this.auditLogService(
        currentMenu,
        "แขวง/ตำบล",
        this.addressContactOriginForm.Subdistrict,
        addressContact.Subdistrict
      )
      : null;
    this.addressContactOriginForm.Zipcode != addressContact.Zipcode
      ? await this.auditLogService(
        currentMenu,
        "รหัสไปรษณีย์",
        this.addressContactOriginForm.Zipcode,
        addressContact.Zipcode
      )
      : null;
  }

  async auditLogService(menu, field, origin, update) {
    await this.authlogService
      .insertAuditlog({
        UpdateDate: new Date(),
        UpdateMenu: menu,
        UpdateField: field,
        DataOriginal: origin,
        UpdateData: update
      })
      .toPromise();
  }

  public async showDistrict(data) {
    this.district = (await this.dropdownService
      .getDistrictByProvince(data)
      .toPromise()).data;
  }

  public async showSubdistrict(data) {
    const zipcode = this.district.find(sub => {
      return sub.Name == data;
    });
    zipcode
      ? this.addressForm.controls["Zipcode"].setValue(zipcode.ZipCode)
      : this.addressForm.controls["Zipcode"].setValue("");

    this.subdistrict = (await this.dropdownService
      .getSubdistrictByDistrict(data)
      .toPromise()).data;
  }

  public async showDistrictContact(data) {
    this.districtContact = (await this.dropdownService
      .getDistrictByProvince(data)
      .toPromise()).data;
  }

  public async showSubdistrictContact(data) {
    const zipcode = this.districtContact.find(sub => {
      return sub.Name == data;
    });
    zipcode
      ? this.addressContactForm.controls["Zipcode"].setValue(zipcode.ZipCode)
      : this.addressContactForm.controls["Zipcode"].setValue("");

    this.subdistrictContact = (await this.dropdownService
      .getSubdistrictByDistrict(data)
      .toPromise()).data;
  }

  public copyAddresss() {
    this.addressContactForm.setValue(this.addressForm.value);
    this.addressContactForm.controls["TypeAddress"].setValue(4);
  }

  public openModal(content, size) {
    return this.modalService.open(content, { size: size });
  }

  public async deleteContact(index) {
    // if (this.corperationId) {
    //   const model = this.contactList[index];
    //   model.CorporationId = Number(this.corperationId);
    //   model.PersonAddressId ? await this.organizationService.deleteCorporationContact(model.CorporationContactId).toPromise() : false;
    // }
    // alertEvent('ลบข้อมูลสำเร็จ', 'success');
    // this.contactList.splice(index, 1);
    if (this.corperationId) {
      Swal.fire({
        title: "",
        text: "คุณต้องการลบข้อมูลนี้หรือไม่",
        type: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก"
      }).then(result => {
        if (result.value) {
          const model = this.contactList[index];
          model.CorporationId = this.corperationId;
          this.organizationService
            .deleteCorporationContact(model.CorporationContactId)
            .subscribe(
              res => {
                // this.province = res.data;
                console.log(res.data);
                if (res.successful) {
                  Swal.fire({
                    title: "สำเร็จ",
                    html: "ลบข้อมูลสำเร็จ",
                    type: "success",
                    onClose: () => {
                      this.contactList.splice(index, 1);
                      // this.router.navigateByUrl("/search-arrest-warrant");
                    }
                  });
                } else {
                  Swal.fire({
                    title: "ผิดพลาด",
                    html: "ลบข้อมูลบไม่สำเร็จ",
                    type: "warning",
                    onClose: () => {
                      console.log(res);
                    }
                  });
                }
              },
              err => {
                console.log(err);
              }
            );
        }
      });
    }
  }

  public async updateContact(value) {
    for (let index = 0; index < value.length; index++) {
      if (value[index].CorporationContactId) {
        const model = value[index];
        model.CorporationId = Number(this.corperationId);
        await this.organizationService
          .updateCorporationContact(model)
          .toPromise();

        const result = this.corperationId
          ? (await this.organizationService
            .getCorporationPerson(this.corperationId)
            .toPromise()).data[0]
          : null;
        const resultAddress = this.corperationId
          ? (await this.organizationService
            .getcorporationaddress(this.corperationId)
            .toPromise()).data
          : null;
        this.setAddressCorperation(resultAddress);

        this.contactList =
          (await this.organizationService
            .getcorporationcontact(this.corperationId)
            .toPromise()).data || [];
        this.corperationForm = this.corperationId
          ? await this.setCorperation(result)
          : await this.setCorperation(null);
      } else {
        if (this.corperationId) {
          value[index].CorporationId = Number(this.corperationId);
          await this.organizationService
            .insertCorporationContact(value[index])
            .toPromise();
        }
        this.contactList.push(value[index]);
      }
    }
    alertEvent("บันทึกข้อมูลสำเร็จ", "success");
  }

  public async submit() {
    if (validForm(this.corperationForm).length > 0) {
      this.alertValid = true;
      return window.scroll(0, 300);
    }
    if (validForm(this.addressForm).length > 0) {
      this.alertValid = true;
      return window.scroll(0, 300);
    }
    if (validForm(this.addressContactForm).length > 0) {
      this.alertValid = true;
      return window.scroll(0, 300);
    }

    this.corperationId ? this.update() : this.Insert();

    alertEvent("บันทึกข้อมูลสำเร็จ", "success");
    return this.router.navigate(["/organizations"]);
  }

  async update() {
    this.corperationForm.value.CreateDate = "2019-05-31 08:47:14.051";
    this.addressForm.value.CreateDate = "2019-05-31 08:47:14.051";
    this.addressContactForm.value.CreateDate = "2019-05-31 08:47:14.051";
    await this.organizationService
      .updatecorporation(this.corperationForm.value)
      .toPromise();
    await this.organizationService
      .updateCorporationAddress(this.addressForm.value)
      .toPromise();
    await this.organizationService
      .updateCorporationAddress(this.addressContactForm.value)
      .toPromise();
    await this.updateLog(
      this.corperationForm.value,
      this.addressForm.value,
      this.addressContactForm.value
    );
  }

  async Insert() {
    const result = (await this.organizationService
      .insertCorporation(this.corperationForm.value)
      .toPromise()).data[0];
    this.corperationId = result.CorporationId;
    this.addressForm.value.CorporationId = result.CorporationId;
    this.addressContactForm.value.CorporationId = result.CorporationId;

    await this.organizationService
      .insertCorporationAddress(this.addressForm.value)
      .toPromise();
    await this.organizationService
      .insertCorporationAddress(this.addressContactForm.value)
      .toPromise();

    if (result.CorporationId) {
      for (let i = 0; i < this.contactList.length; i++) {
        this.contactList[i].CorporationId = Number(result.CorporationId);
        await this.organizationService
          .insertcoordinatorcantact(this.contactList[i])
          .toPromise();
      }
    }
  }

  public back(step) {
    if (step == '1') {
      Swal.fire({
        title: '',
        text: 'ต้องการบันทึกข้อมูลหรือไม่',
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true
      }).then(async result => {
        if (result.value) {
          this.nextToStep2().then(() => {
            this.router.navigate(["/organizations"]);
          });
        }
        else {
          return this.router.navigate(["/organizations"]);
        }
      });
    } else {
      return this.router.navigate(["/organizations"]);
    }

  }

  private async setAddressCorperation(resultAddress) {
    if (resultAddress) {
      for (let index = 0; index < resultAddress.length; index++) {
        if (resultAddress[index].TypeAddress == 1) {
          this.addressForm = await this.setAddress(resultAddress[index], 1);
        } else if (resultAddress[index].TypeAddress == 4) {
          this.addressContactForm = await this.setAddress(
            resultAddress[index],
            4
          );
        }
      }
    }
  }

  private setCorperation(data) {
    return data
      ? this.formBuilder.group({
        CorporationId: [data.CorporationId],
        CorporationName: [data.CorporationName],
        Parent: [data.Parent],
        TaxNo: [data.TaxNo],
        // Detail: [data.Detail],
        PathFile: [data.PathFile]
      })
      : this.formBuilder.group({
        CorporationName: ["", [Validators.required]],
        Parent: [0],
        TaxNo: [""],
        // Detail: [""],
        PathFile: [1]
      });
  }

  private setAddress(data, type) {
    return data
      ? this.formBuilder.group({
        CorporationId: [data.CorporationId],
        CorporationAddressId: [data.CorporationAddressId],
        TypeAddress: [data.TypeAddress, [Validators.required]],
        HouseNumber: [data.HouseNumber, [Validators.required]],
        Building: [""],
        Floor: [""],
        Room: [""],
        Road: [""],
        Soi: [""],
        Subdistrict: [data.Subdistrict, [Validators.required]],
        District: [data.District, [Validators.required]],
        Province: [data.Province, [Validators.required]],
        Zipcode: [data.Zipcode, [Validators.required]]
      })
      : this.formBuilder.group({
        CorporationId: [null],
        CorporationAddressId: [null],
        TypeAddress: [type, [Validators.required]],
        HouseNumber: ["", [Validators.required]],
        Building: [""],
        Floor: [""],
        Room: [""],
        Road: [""],
        Soi: [""],
        Subdistrict: [1, [Validators.required]],
        District: [1, [Validators.required]],
        Province: [1, [Validators.required]],
        Zipcode: ["", [Validators.required]]
      });
  }

  private setContact(data) { }

  public async nextToStep2() {
    if (
      this.corperationForm.controls.TaxNo.value == "" ||
      this.corperationForm.controls.TaxNo.value == null ||
      this.corperationForm.controls.CorporationName.value == "" ||
      this.corperationForm.controls.CorporationName.value == null
    ) {
      this.alertValid = true;
      return window.scroll(0, 300);
    }
    this.notNext = 2;
    const insert = this.activatedRoute.snapshot.paramMap.get("id");
    insert ? this.update() : this.Insert();
    this.disable == true
    this.alertValid = false;
    alertEvent("บันทึกข้อมูลสำเร็จ", "success");
    return this.stepper.next();
  }

  public async nextToStep3() {
    if (validForm(this.addressForm).length > 0) {
      this.alertValid = true;
      return window.scroll(0, 300);
    }
    if (validForm(this.addressContactForm).length > 0) {
      this.alertValid = true;
      return window.scroll(0, 300);
    }
    this.disable == true
    this.alertValid = false;
    const insert = this.activatedRoute.snapshot.paramMap.get("id");
    insert ? this.update() : this.Insert();

    alertEvent("บันทึกข้อมูลสำเร็จ", "success");

    return this.stepper.next();
  }

}
