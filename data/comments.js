const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
let { ObjectId } = require("mongodb");
//working
const createComment = async (userId, eventId, comments) => {
    if (!userId || !eventId || !comments) {
        throw "All fields need to have valid values";
    }

    if (
        typeof eventId != "string" ||
        typeof comments != "string" ||
        typeof userId != "string" ||
        typeof eventId != "string" ||
        typeof comments != "string" ||
        userId.trim().length == 0 ||
        eventId.trim().length == 0 ||
        comments.trim().length == 0
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    parsedEventid = ObjectId(eventId);
    try {
        parsedUserid = ObjectId(userId);
    } catch (e) {
        throw "userid format wrong";
    }
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "eventid format wrong";
    }

    const eventCollection = await events();

    const newComment = {
        _id: ObjectId(),
        userId: userId,
        comments: comments,
    };
    const updatedEvent = await eventCollection.updateOne(
        { _id: parsedEventid },
        { $push: { comments: newComment } }
    );
    const finalEvent = await eventCollection.findOne({
        _id: parsedEventid,
    });

    return finalEvent;
};

const getAllComments = async (eventId) => {
    if (!eventId) {
        throw "id need to have valid values";
    }
    if (typeof eventId != "string" || eventId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }

    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();
    const findEvent = await eventCollection.findOne({
        _id: ObjectId(parsedEventid),
    });
    if (findEvent == null) throw "Event not exist with that eventId";
    return findEvent.comments;
};

//working
const getComment = async (commentId) => {
    if (!commentId) {
        throw "CommentId need to have valid values";
    }
    if (typeof commentId != "string" || commentId.trim().length == 0) {
        throw "Commentid must not be string or empty string,";
    }

    try {
        parsedCommentid = ObjectId(commentId);
    } catch (e) {
        throw "id format wrong";
    }

    const eventCollection = await events();
    const findEvent = await eventCollection.findOne(
        { "comments._id": ObjectId(commentId) },
        { projection: { _id: 0, "comments.$": 1 } }
    );
    if (findEvent == null) throw "Review doesn't exist.";
    return findEvent.comments;
};
const remove = async (commentId) => {
    if (!commentId) {
        throw "id need to have valid values";
    }
    if (typeof commentId != "string" || commentId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }

    const findEvent = await eventCollection.findOne(
        { "comments._id": ObjectId(commentId) },

        { projection: { _id: 0, "comments.$": 1 } }
        // {s
        //     $or: [
        //         { "comments.userId": userId },
        //         { "comments._id": ObjectId(commentId) },
        //         //   { projection: { _id: 0, "comments.$": 1 } },
        //     ],
        // }
        // { "comments.userId": ObjectId(userId) },
        // { "comments._id": ObjectId(commentId) },
        // { projection: { _id: 0, "comments.$": 1 } }
    );

    if (findEvent == null) throw "Comment doesn't found.";
    return findEvent.comments;
};
//working
const getUserscomments = async (userId) => {
    if (!userId) {
        throw "id need to have valid values";
    }
    if (typeof userId != "string" || userId.trim().length == 0) {
        throw "id must not be string or empty string,";
    }
    try {
        parsedUserid = ObjectId(userId);
    } catch (e) {
        throw "id format wrong";
    }
    const eventCollection = await events();

    const findEvent = await eventCollection
        .find(
            { "comments.userId": userId },

            { projection: { _id: 0, "comments.$": 1 } }
            // {s
            //     $or: [
            //         { "comments.userId": userId },
            //         { "comments._id": ObjectId(commentId) },
            //         //   { projection: { _id: 0, "comments.$": 1 } },
            //     ],
            // }
            // { "comments.userId": ObjectId(userId) },
            // { "comments._id": ObjectId(commentId) },
            // { projection: { _id: 0, "comments.$": 1 } }
        )
        .toArray();

    // comments["_id"] = findEvent._id;
    // comments["comments"] = findEvent.comments;
    // comment.push(comments);

    if (findEvent == null) throw "Comment for this user doesn't found.";

    return findEvent;
};
//working
const removeComment = async (commentId) => {
    if (!commentId) {
        throw "Comment id need to have valid values";
    }
    if (typeof commentId != "string" || commentId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }

    try {
        parsedCommentid = ObjectId(commentId);
    } catch (e) {
        throw "id format wrong";
    }

    const eventCollection = await events();
    const findComment = await eventCollection.findOne({
        "comments._id": parsedCommentid,
        "comments._id": ObjectId(commentId),
    });

    if (findComment == null) throw "Comment doesn't exist";

    for (let i = 0; i < findComment.comments.length; i++) {
        if (findComment.comments[i]._id == parsedCommentid) {
            commentCount = commentCount + 1;
            commentCount = commentCount - 1;
        }
        const finalComments = await eventCollection.updateOne(
            { "comments._id": ObjectId(commentId) },
            { $pull: { comments: findComment.comments[i] } }
        );
        return `Comment has been successfully deleted`;
    }

    if (commentCount == 0) throw "Comment doesn't exists with this CommentId,";
};

module.exports = {
    remove,
    createComment,
    getAllComments,
    getComment,
    removeComment,
    getUserscomments,
};
