import { AwsCognitoService } from '@shared/infrastructure-aws-cognito';

export class AuthService {
  constructor(private readonly awsCognitoService: AwsCognitoService) {}
  async signIn(
    username: string,
    pass: string,
  ): Promise<{
    accessToken: string;
  }> {
    // TODO: Implement sign in
    // Step 1: Validate user credentials via AWS Cognito
    const authResponse = await this.awsCognitoService.signIn(username, pass);
    // Step 2: Retrieve user from the database
    // Step 3: Generate a custom JWT access token

    return {
      accessToken: 'accessToken',
    };
  }
}
