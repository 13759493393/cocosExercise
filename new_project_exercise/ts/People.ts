class People{
    name:string;
    age:number;
    isWorking:boolean;
}

console.log("<===这是People中的打印===>");

let p1 = new People();
p1.name = "小明";
p1.age = 999;
console.log(p1);

//模块导入导出

export interface AAA {
    isAcceptable(s: string): boolean;
}

export const regular = /\^[0-9]+$/;

export class BBB implements AAA {
    isAcceptable(s: string) {
        return s.length === 5 && regular.test(s);
    }
}

const bbb = new BBB();
export default bbb;

export {BBB as bbb};