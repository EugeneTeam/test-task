import { Router } from 'express';
import { CustomerService } from './customer.service';
import { Request, Response } from 'express';
import { customerConstants } from './customer.constants';

const router = Router();

router.get(
  customerConstants.START_INSERT_CUSTOMER,
  async (req: Request, res: Response) => CustomerService.start(req, res)
);

router.get(
  customerConstants.STOP_INSERT_CUSTOMER,
  async (req: Request, res: Response) => CustomerService.stop(req, res)
);

export { router as CustomerRouter };
