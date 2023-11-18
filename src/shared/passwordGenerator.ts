export default function GeneratePassword() {
  const lowCase: string = "abcdefghijklmnopqrstuvxyz";
  const upCase: string = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
  const Numbers: string = "0123456789";
  const SpecialChar: string = "£$&()*+[]@#^-_!?";
  const charCategories: number = 4;

  // Define password length
  const passLength: number = 8;

  // Initialize password
  let password: string = "";

  // FOR loop
  for (let i = 0; i < passLength; i++) {
    const chooseCharGroup: number = Math.round(
      Math.abs(Math.random() * (charCategories - 1))
    );
    switch (chooseCharGroup) {
      case 0:
        const indexLow: number = Math.round(
          Math.abs(Math.random() * (lowCase.length - 1))
        );
        password += lowCase.charAt(indexLow);
        break;
      case 1:
        const indexUp: number = Math.round(
          Math.abs(Math.random() * (upCase.length - 1))
        );
        password += upCase.charAt(indexUp);
        break;
      case 2:
        const indexNum: number = Math.round(
          Math.abs(Math.random() * (Numbers.length - 1))
        );
        password += Numbers.charAt(indexNum);
        break;
      case 3:
        const indexSpecial: number = Math.round(
          Math.abs(Math.random() * (SpecialChar.length - 1))
        );
        password += SpecialChar.charAt(indexSpecial);
        break;
    }
  }
  return password;
}
