import SignDataType from "../../../context/interfaces/SignUpType"

export function checkEmptyForm(signData : SignDataType){
    const {description, profile} = signData
    if(description==='' || profile===''){
      return false
    }
    else{
      return true
    }
}
