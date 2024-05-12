import { Type } from 'class-transformer';
import { ReadCompanyDto } from '../../company/dto/read-company.dto';
import { ReadProviderDto } from '../../provider/dto/read-provider.dto';
import { ReadTeamDto } from '../../team/dto';

export class ReadUserDto {
  id: number;
  username: string;
  code: string;
  code_externe: string;
  token_publique: string;
  ignore: boolean;
  date_fin?: string | null;
  offre: string;
  is_prospect_reserved: boolean;
  connexion_interne_seulement: boolean;
  ip_authorized: string[];

  @Type(() => ReadCompanyDto)
  company: ReadCompanyDto;

  @Type(() => ReadProviderDto)
  provider: ReadProviderDto;

  @Type(() => ReadTeamDto)
  team: ReadTeamDto;
}
