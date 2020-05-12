"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

// Models
var _UserInfoDonation = require('../models/UserInfoDonation'); var _UserInfoDonation2 = _interopRequireDefault(_UserInfoDonation);
var _Donation = require('../models/Donation'); var _Donation2 = _interopRequireDefault(_Donation);


class DonationController {

  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;

    try {
      
      const donations = await _Donation2.default.findAll({
            where: { user_id },
      });
    
      if(donations.length == 0) return res.status(404).json({ error: "You have not donated to anyone yet." });
        
      return res.status(200).json({donations: donations});
    } catch (error) {
      return res.status(400).json(error.message);   
    }
  }


  async store(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;
   
    const target_id = parseInt(req.params.targetId);
    const {information, ammount} = req.body;

    try{
        if(user_id == target_id) return res.status(401).json({error: 'You cannot donate to yourself'});
        
        let infoDonation = await _UserInfoDonation2.default.findOne({
            where: { user_id: target_id },
        });
        
        if (infoDonation == null) return res.status(404).json({error: "Couldn't find an info donation for this user"});
       
        const donation = await _Donation2.default.create({
            ammount,
            information,
            user_id,
            target_id
        });

        return res.status(200).json(donation);
    }catch(err){
        return res.status(400).json(err.message);
    }
  }



  async update(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;

    try {
      
      const donation_id = parseInt(req.params.donationId);
      const {information, ammount} = req.body;

      const donation = await _Donation2.default.findByPk(donation_id);

      if(donation == null) return res.status(400).json({error: "Donation not found."}); 

      if(donation.user_id != user_id ) return res.status(401).json({error: "You are not authorized to update this donation."});

      await donation.update({
        information,
        ammount
      })
      
      return res.status(200).json({message: "Donation updated successfully"});

    }catch (err) {
      return res.status(400).json(err.message);
    }

  }


  async delete(req, res) {
   
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;

    try {
      
      const donation_id = parseInt(req.params.donationId);

      const donation = await _Donation2.default.findByPk(donation_id);

      if(donation == null) return res.status(400).json({error: "Donation not found."}); 

      if(donation.user_id != user_id ) return res.status(401).json({error: "You are not authorized to delete this donation."});

      await donation.destroy();
      
      return res.status(200).json({message: "Donation deleted successfully"});

    }catch (err) {
      return res.status(400).json(err.message);
    }
  }

}

exports. default = new DonationController();
