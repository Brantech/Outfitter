import * as Cognito from '../../assets/amazon-cognito-identity.min';

export class Aws {
  private poolData = {
    UserPoolId: 'us-east-1_bBfUzR7Vr',
    ClientId: '2qlg1os2kkpdbulfhlt48cptq4'
  };
  private userPool = new Cognito.CognitoUserPool(this.poolData);

  constructor() {}

  public login(username: string, password: string, success: (result)=>void, err: (err)=>void) {
    var authenticationDetails = new Cognito.AuthenticationDetails({Username: username, Password: password});
    var userData = {Username: username, Pool: this.userPool};

    var cognitoUser = new Cognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: success,
      onFailure: err
    });
  }

  public register(username: string, password: string, email: string, success: (err, result)=>void) {
    let attributeEmail = new Cognito.CognitoUserAttribute({Name: 'email', Value: email});
    let attributeFamilyName = new Cognito.CognitoUserAttribute({Name: 'family_name', Value: username});
    let attributeName = new Cognito.CognitoUserAttribute({Name: 'name', Value: username});
    console.log(username, password);
    this.userPool.signUp(username, password, [attributeEmail, attributeName, attributeFamilyName], null, success);
  }
}
