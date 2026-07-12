import { Request, Response } from "express";

import * as DashboardService from "../services/dashboard.service";

export async function getDashboardSummary(
  req: Request,
  res: Response
): Promise<void> {

  try {

    const summary =
      await DashboardService.getDashboardSummary();

    res.status(200).json({

      success: true,

      data: summary,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Unable to load dashboard summary.",

    });

  }

}