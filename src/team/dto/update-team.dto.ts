import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  code?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  // Team leader ID; optional since you may not want to change the leader every time
  @IsOptional()
  teamLeaderId?: number;

  // Provider IDs; optional and only needed if updating the associated providers
  @IsOptional()
  providerIds?: number[];

  // Team member IDs; optional and only needed if updating the team members
  @IsOptional()
  teamMemberIds?: number[];
}
