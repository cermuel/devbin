import {
  Router,
  Request,
  Response,
} from "express";

const router = Router();

import {
  createProject,
  getAllProjects,
  getCollaborationInvites,
  getCollaborationRequests,
  getMyProjects,
  getSentCollaborationInvites,
  getSentCollaborationRequests,
  getSingleProject,
  inviteCollaboration,
  requestCollaboration,
  respondToInvite,
  respondToRequest,
} from "./projects.controller";
import {
  APIResponse,
  APIParams,
  APIQuery,
} from "../types";
import {
  IConnection,
  IProject,
} from "./projects.dto";
import { StatusCodes } from "http-status-codes";
import { validateRequest } from "../middlewares/validate.middleware";
import {
  inviteCollabValid,
  isValidId,
} from "./connect.dto";

router
  .route("/")
  .post(
    async (
      req: Request<
        object,
        object,
        IProject
      >,
      res: Response<
        APIResponse<{
          project: IProject;
        }>
      >,
    ) => {
      const { name, files } = req.body;

      const project =
        await createProject(
          name,
          files,
          req.user,
        );
      res
        .status(StatusCodes.CREATED)
        .json({
          msg: "Project created Sucessfully",
          data: { project },
          statusCode:
            StatusCodes.CREATED,
        });
    },
  )
  .get(
    async (
      req: Request,
      res: Response<
        APIResponse<{
          projects: IProject[];
        }>
      >,
    ) => {
      const projects =
        await getAllProjects(req.query);
      res.status(StatusCodes.OK).json({
        msg: "Projects fetched Sucessfully",
        data: { projects },
        statusCode: StatusCodes.OK,
      });
    },
  );

router.get(
  "/my",
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<
      APIResponse<{
        projects: IProject[];
      }>
    >,
  ) => {
    req.query.owner = req.user._id;
    const projects =
      await getMyProjects(req.query);
    res.status(StatusCodes.OK).json({
      msg: "Projects fetched Sucessfully",
      data: { projects },
      statusCode: StatusCodes.OK,
    });
  },
);

router.get(
  "/invites",
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<
      APIResponse<{
        requests: IConnection[];
      }>
    >,
  ) => {
    const requests =
      await getCollaborationInvites(
        req.user,
      );

    res.status(StatusCodes.OK).json({
      msg: "Requests fetched Sucessfully",
      data: { requests },
      statusCode: StatusCodes.OK,
    });
  },
);

router.get(
  "/requests",
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<
      APIResponse<{
        requests: IConnection[];
      }>
    >,
  ) => {
    const requests =
      await getCollaborationRequests(
        req.user,
      );

    res.status(StatusCodes.OK).json({
      msg: "Requests fetched Sucessfully",
      data: { requests },
      statusCode: StatusCodes.OK,
    });
  },
);

router.get(
  "/requestsent",
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<
      APIResponse<{
        requests: IConnection[];
      }>
    >,
  ) => {
    const requests =
      await getSentCollaborationRequests(
        req.user,
      );

    res.status(StatusCodes.OK).json({
      msg: "Sent Requests fetched Sucessfully",
      data: { requests },
      statusCode: StatusCodes.OK,
    });
  },
);

router.get(
  "/invitesent",
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<
      APIResponse<{
        invites: IConnection[];
      }>
    >,
  ) => {
    const invites =
      await getSentCollaborationInvites(
        req.user,
      );

    res.status(StatusCodes.OK).json({
      msg: "Sent Invites fetched Sucessfully",
      data: { invites },
      statusCode: StatusCodes.OK,
    });
  },
);

router
  .route("/:id")
  .get(
    validateRequest({
      params: isValidId,
    }),
    async (
      req: Request<
        APIParams,
        object,
        Record<string, never>,
        APIQuery
      >,
      res: Response<
        APIResponse<{
          project: IProject;
        }>
      >,
    ) => {
      const project =
        await getSingleProject(
          req.params.id,
        );
      res.status(StatusCodes.OK).json({
        msg: "Project fetched Sucessfully",
        data: { project },
        statusCode: StatusCodes.OK,
      });
    },
  )
  .patch(
    validateRequest({
      params: isValidId,
    }),
    async (
      req: Request<
        APIParams,
        object,
        IProject
      >,
      res: Response<
        APIResponse<{
          project: IProject;
        }>
      >,
    ) => {
      const project =
        await getSingleProject(
          req.params.id,
        );
      if (
        project.owner.toString() !==
        req.user._id.toString()
      ) {
        res
          .status(
            StatusCodes.UNAUTHORIZED,
          )
          .json({
            msg: "You are not authorized to update this project",
            statusCode:
              StatusCodes.UNAUTHORIZED,
          });
        return;
      }
      project.name = req.body.name;
      await project.save();
      res.status(StatusCodes.OK).json({
        msg: "Project updated Sucessfully",
        data: { project },
        statusCode: StatusCodes.OK,
      });
    },
  );

router.post(
  "/:id/invite",
  validateRequest({
    body: inviteCollabValid,
    params: isValidId,
  }),
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<
      APIResponse<{ project: IProject }>
    >,
  ) => {
    const msg =
      await inviteCollaboration(
        req.params.id,
        req.body.user,
        req.user._id,
      );

    res.status(StatusCodes.OK).json({
      msg,
      statusCode: StatusCodes.OK,
    });
  },
);

router.post(
  "/:id/request",
  validateRequest({
    params: isValidId,
  }),
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<
      APIResponse<{ project: IProject }>
    >,
  ) => {
    const msg =
      await requestCollaboration(
        req.params.id,
        req.user._id,
      );

    res.status(StatusCodes.OK).json({
      msg,
      statusCode: StatusCodes.OK,
    });
  },
);

router.post(
  "/invite/:id/respond",
  validateRequest({
    params: isValidId,
  }),
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<APIResponse<{}>>,
  ) => {
    const { response } = req.body;

    const msg = await respondToInvite(
      req.params.id,
      response,
      req.user,
    );
    res.status(StatusCodes.OK).json({
      msg,
      statusCode: StatusCodes.OK,
    });
  },
);

router.post(
  "/request/:id/respond",
  validateRequest({
    params: isValidId,
  }),
  async (
    req: Request<
      APIParams,
      object,
      Record<string, never>,
      APIQuery
    >,
    res: Response<APIResponse<{}>>,
  ) => {
    const { response } = req.body;

    const msg = await respondToRequest(
      req.params.id,
      response,
      req.user,
    );
    res.status(StatusCodes.OK).json({
      msg,
      statusCode: StatusCodes.OK,
    });
  },
);

export default router;
