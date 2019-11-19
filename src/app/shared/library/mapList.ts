import {any} from 'codelyzer/util/function';
import {map} from 'rxjs/operators';

export function mapPersons(personList) {
    personList.map(data => {
        const title = data.TitleNameTh == 1 ? 'นาย ' : data.TitleNameTh == 2 ? 'นางสาว ' : data.TitleNameTh == 3 ? 'นาง ' :data.TitleNameTh
        const first = data.FristNameTh;
        const last = data.LastNameTh;
        const orther = data.TitleNameOther;
        data.FullnameTh = (orther) ? first && last ? orther + first + ' ' + last : '' : first && last ? title + first + ' ' + last : '';
        const titleEn = data.TitleNameEn == 1 ? 'Mr. ' : data.TitleNameEn == 2 ? 'Mrs. ' : 'Miss. ';
        const firstEn = data.FristNameEn;
        const lastEn = data.LastNameEn;
        data.FullnameEn = (orther) ? firstEn && lastEn ? orther + firstEn + ' ' + lastEn : '' : firstEn && lastEn ? titleEn + firstEn + ' ' + lastEn : '';
    });
    return personList;
}

export function createdNamePersons(personList, id) {
    const result = personList.find(data => {
        return data.PersonId == id;
    });
    return result.FullnameTh;
}

export function showAddress(addresslist) {
  addresslist.map(value => {
    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
    const Room = value.Room ? 'ห้อง ' + value.Room + ' ' : '';
    const HouseNumber = value.HouseNumber ? 'เลขที่ ' + value.HouseNumber + ' ' : '';
    const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
    const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
    const Province = value.Province != '' ? 'จังหวัด ' + value.Province + ' ' : '';
    if (value.Province == 'กรุงเทพมหานคร') {
      const Subdistrict = value.Subdistrict != '' ? 'แขวง ' + value.Subdistrict + ' ' : '';
      const District = value.District != '' ? 'เขต ' + value.District + ' ' : '';
      const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
      return Building + Floor + Room + HouseNumber + Road + Soi + Subdistrict + District + Province +  Zipcode;
    } else {
      const Subdistrict = value.Subdistrict != '' ? 'ตำบล ' + value.Subdistrict + ' ' : '';
      const District = value.District != '' ? 'อำเภอ ' + value.District + ' ' : '';
      const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
      return Building + Floor + Room + HouseNumber + Road + Soi + Subdistrict + District + Province +  Zipcode;
    }
  })
  return addresslist;

}


export function groupbyList(array: any, key: string) {
  // tslint:disable-next-line:prefer-const
  let obj = array;
  const result1 = Object.keys(obj).map(function(keyObj) {
    return [Number(keyObj), obj[keyObj]];
  });
  return obj.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).
    push(currentValue);
    return result;
  }, {});
}

