import SignDataType from "../../../context/interfaces/SignUpType"

export function checkEmptyForm(signData : SignDataType){
    const {category} = signData
    if(category.length === 0){
      return false
    }
    else{
      return true
    }
}

export const jobs = [
    {
      id: '1',
      name: '설거지',
    },
    {
      id: '2',
      name: '서빙',
    },
    {
      id: '3',
      name: '청소',
    },
    {
      id: '4',
      name: '음료제조',
    },
    {
      id: '5',
      name: '전단지',
    },
    {
      id: '6',
      name: '배달',
    },
    {
      id: '7',
      name: '고객관리',
    },
    {
      id: '8',
      name: '홍보',
    },
    {
      id: '9',
      name: '주방보조',
    },
    {
      id: '10',
      name: '포장',
    },
    {
      id: '11',
      name: '판매',
    },
    {
      id: '12',
      name: '심부름',
    },
    {
      id: '13',
      name: '카운터',
    },
    {
      id: '14',
      name: '계산',
    },
    {
      id: '15',
      name: '재료관리',
    },
    {
      id: '16',
      name: '매장관리',
    },
  ];
