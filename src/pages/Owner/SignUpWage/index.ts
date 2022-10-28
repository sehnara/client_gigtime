import SignDataType from "../../../context/interfaces/SignUpType"

export function checkEmptyForm(signData : SignDataType){
    const {pay} = signData
    if(!pay){
      return false
    }
    else{
      return true
    }
}
