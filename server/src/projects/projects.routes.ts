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

router
  .route("/:id")
  .get(
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
        return res
          .status(
            StatusCodes.UNAUTHORIZED,
          )
          .json({
            msg: "You are not authorized to update this project",
            statusCode:
              StatusCodes.UNAUTHORIZED,
          });
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

    return res
      .status(StatusCodes.OK)
      .json({
        msg,
        statusCode: StatusCodes.OK,
      });
  },
);

router.post(
  "/:id/request",
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

    return res
      .status(StatusCodes.OK)
      .json({
        msg,
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

    return res
      .status(StatusCodes.OK)
      .json({
        msg: "Requests fetched Sucessfully",
        data: { requests },
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
        invites: IConnection[];
      }>
    >,
  ) => {
    const invites =
      await getCollaborationInvites(
        req.user,
      );

    return res
      .status(StatusCodes.OK)
      .json({
        msg: "Invites fetched Sucessfully",
        data: { invites },
        statusCode: StatusCodes.OK,
      });
  },
);

router.post(
  "/invite/:id/respond",
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
