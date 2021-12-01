const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
let { ObjectId } = require("mongodb");

const create = async (eventId, comments) => {
    if (!eventId || !comments) {
        throw "All fields need to have valid values";
    }

    if (
        typeof eventId != "string" ||
        typeof comments != "string" ||
        eventId.trim().length == 0 ||
        comments.trim().length == 0
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    parsedEventid = ObjectId(eventId);

    const eventCollection = await events();

    const newComment = {
        _id: ObjectId(),
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

const getAll = async (eventId) => {
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
const get = async (commentId) => {
    if (!commentId) {
        throw "id need to have valid values";
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
    try {
        parsedCommentid = ObjectId(commentId);
    } catch (e) {
        throw "id format wrong";
    }

    const eventCollection = await events();
    const findComment = await eventCollection.findOne({
        "comments._id": parsedCommentid,
    });

    if (findComment == null) throw "Comment doesn't exist";

    for (let i = 0; i < findComment.comments.length; i++) {
        if (findComment.comments[i]._id == parsedCommentid) {
            commentCount = commentCount + 1;
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
    create,
    getAll,
    get,
    remove,
};
