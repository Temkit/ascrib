import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  code: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  // Team leader ID; assumes only the ID is passed during creation
  @IsNotEmpty()
  teamLeaderId: number;

  // Provider IDs; assumes only the IDs are passed during creation
  providerIds?: number[];

  // Team member IDs; optional, assumes only the IDs are passed during creation
  teamMemberIds?: number[];
}
