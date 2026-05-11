module {
  public type SocialLinks = {
    facebook : ?Text;
    instagram : ?Text;
    twitter : ?Text;
    youtube : ?Text;
    whatsapp : ?Text;
  };

  public type SystemSettings = {
    churchName : Text;
    logoUrl : ?Text;
    primaryColor : Text;
    contactEmail : Text;
    contactPhone : ?Text;
    address : ?Text;
    socialLinks : SocialLinks;
    welcomeMessage : Text;
    aboutUs : Text;
  };

  public type StripeConfig = {
    secretKey : Text;
    allowedCountries : [Text];
  };
};
