import { User } from '../../user/user.entity'; // Adjust import paths as needed
import { Provider } from '../../provider/provider.entity'; // Adjust import paths as needed

export class ReadTeamDto {
  id: number;
  code: string;
  name: string;
  teamLeader: User;
  providers: Provider[];
  teamMembers: User[];
}
