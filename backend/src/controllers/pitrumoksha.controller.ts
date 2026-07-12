import { Request, Response } from "express";

import * as PitruService from "../services/pitrumoksha.service";

export async function getRequests(
  req: Request,
  res: Response
): Promise<void> {

  try {

    const data =
      await PitruService.getRequests();

    res.status(200).json({

      success: true,

      data,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Failed to fetch requests.",

    });

  }

}

export async function createRequest(
  req: Request,
  res: Response
): Promise<void> {

  try {

    const request =
      await PitruService.createRequest(req.body);

    res.status(201).json({

      success: true,

      message: "PitruMoksha Request Created",

      data: request,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Failed to create request.",

    });

  }

}