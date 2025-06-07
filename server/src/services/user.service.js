import emailSvc from "./email.service.js";

class UserService {
  sendEmailFunc = async (to, subject, text, html) => {
    const result = await emailSvc.sendEmail(to, subject, text, html);
    if (result.success) {
      return true;
    } else {
      return false;
    }
  };
}

const userSvc = new UserService();
export default userSvc;