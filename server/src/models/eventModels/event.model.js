import mongoose, { Schema } from 'mongoose';


const eventSchema = new mongoose.Schema({

  eventTitle: {
    type: String,
    required: true
  },
  
  eventOrganiser: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],

  eventDescription: {
    type:  String,
    required: true
  },

  eventSubject: {
    type: String,
    // required: true
  },

  eventType: {
    type: String,
    // required: true,
    // enum: ["online", "offline", "hybrid"],
    default: "online"
  },

  eventLocation: {
    type: String,
    // required: true,
  },

  eventRegistrationLastDate: {
    type: Date,
    // required: true
  },

  eventUserCapacity: {
    type: Number,
    // required: true
  },

  eventCategory: {
    type: String,
    default: ""
  },

  eventRegisterdCount: {
    type: Number
  },
  
  eventTeamMembers: {
    type: Number,
  },

  eventReviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],

  eventBanner: {
      public_id: {
        type: String
      },
      public_url: {
        type: String
      },
  },

  eventLogo: {
    public_id: {
      type: String
    }, 
    public_url: {
      type: String
    },
  },

  eventContactDetails: {
    phone: {
        number: {
          type: String
        },
        type: {
          type: String
        }
      },
      email: {
        type: String
      }
  },

  eventFAQ: {
    questions: {
      type: String
    },
    answers: {
      type: String
    },
    likes: {
      type: BigInt
    }
  },

  eventDate: {
    type: Date,
    // required: true
  },

  eventDuration: {
    type: String,
    // required: true
  },
  
  eventTime: {
    type: String,
    // required: true
  },

  
  eventLikes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  eventExpresions: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  eventShares: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

  eventRegistedUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],


  eventBlocked: {
    type: Boolean,
    default: false
  },

  eventCustomFormData : {

  },

  bookmarkedBy: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

}, {timestamps: true}, { optimisticConcurrency: true });

export const Event = mongoose.model('Event', eventSchema);             
