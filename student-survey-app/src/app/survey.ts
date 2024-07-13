// Survey model to define the structure of a survey object
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
    likedMost!: string;
    interestedBy!: string;
    likelihoodToRecommend!: string;
    additionalComments!: string;
  }