/*
  Name: Woon-Gi Hong
  G#: G01032192
  Name: Jimmy Tran
  G#: G01130635
  Course-Section: SWE642-001
  Assignment: #3
  
  Survey model to define the structure of a survey object */
export class Survey {
    id?: number;
    firstName!: string;
    lastName!: string;
    streetAddress!: string;
    city!: string;
    state!: string;
    zip!: string;
    telephoneNumber!: string;
    email!: string;
    dateOfSurvey!: string;
    likedMost!: string[];
    interestedBy!: string;
    likelihoodToRecommend!: string;
    additionalComments!: string;
  }