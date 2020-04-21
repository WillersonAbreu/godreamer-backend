import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Models
import UserInfoDonation from '../models/UserInfoDonation';

class UserInfoDonationController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;

    try{
      const infoDonation = await UserInfoDonation.findAll({
        where: { user_id }
      });
      return res.status(200).json({UserInfoDonations: infoDonation});

    }catch(err){
      return res.status(400).json(err);
    }

  }

  async store(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;
    const {information, account} = req.body; 

    try{
        let checkinfoDonation = 0;
        checkinfoDonation = await UserInfoDonation.findAll({
          where: { user_id }
        });

        if(checkinfoDonation == 0){
          const infoDonation = await UserInfoDonation.create({
            information,
            account,
            user_id
        });
          return res.status(200).json( infoDonation );
        }else{
          return res.status(400).json({error : "Can't create another donation info for the same user"});
        }
    
    }catch (err) {
      return res.status(400).json( err.message );
    }
  }
  async update(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;
    const {information, account} = req.body; 

    try{
        let checkinfoDonation = null;
        checkinfoDonation = await UserInfoDonation.findOne({
          where: { user_id }
        });

        if(checkinfoDonation == null) return res.status(400).json({error : "Couldn't find a info donation for this user id."});

        if(checkinfoDonation.user_id != user_id) {
          return res.status(400).json({error : "Cannot change a info donation by another user"});
        }

        await checkinfoDonation.update({
          information,
          account
        });
        return res.status(200).json( checkinfoDonation );
    
    }catch (err) {
      return res.status(400).json( err.message );
    }
  }

  async delete(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;
      
    try{
      const infoDonation = await UserInfoDonation.findOne({
        where: { user_id }
      });
      if (infoDonation == null) {
        return res.status(400).json({message: "Info not found"});
      }
      await infoDonation.destroy();
      return res.status(200).json({ message: "Donation info deleted successfully"})
    
    }catch(err){
      return res.status(400).json(err);
    }
   
  }

}

export default new UserInfoDonationController();
