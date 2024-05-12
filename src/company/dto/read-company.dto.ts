import { CompanyType } from './../company.entity';
import { ReadUserDto } from '../../user/dto/read-user.dto'; // Assume there's a UserDto defined somewhere
import { ReadProviderDto } from '../../provider/dto/read-provider.dto'; // Assume there's a ProviderDto defined somewhere

export class ReadCompanyDto {
  id: number;
  code: string;
  logo?: string;
  raisonSociale: string;
  siret: string;
  rcs?: string;
  typeGeneral: CompanyType;
  orias: string;
  oriasVerifie: boolean;
  dateDebutOrias: Date;
  dateFinOrias?: Date;
  informationContact?: string;
  telephone?: string;
  mail?: string;
  adresse?: string;
  complement?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
  divers1?: string;
  divers2?: string;
  divers3?: string;
  divers4?: string;
  divers5?: string;
  divers6?: string;
  divers7?: string;
  divers8?: string;
  divers9?: string;
  divers10?: string;
  divers11?: string;
  divers12?: string;
  divers13?: string;
  divers14?: string;
  divers15?: string;
  divers16?: string;
  divers17?: string;
  divers18?: string;
  divers19?: string;
  divers20?: string;
  users?: ReadUserDto[];
  providers?: ReadProviderDto[];
}
