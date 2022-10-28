import SignDataType from "../../../context/interfaces/SignUpType";

export function checkEmptyForm(signData : SignDataType){
    const {id, password, name, phone} = signData
    if(id === '' || password ==='' || name === ''|| phone===''){
      return false
    }
    else{
      return true
    }
  }
