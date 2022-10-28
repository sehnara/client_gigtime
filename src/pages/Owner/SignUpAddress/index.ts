import SignDataType from "../../../context/interfaces/SignUpType"

export function checkEmptyForm(signData : SignDataType){
    const {address} = signData
    if(address===''){
      return false
    }
    else{
      return true
    }
}

