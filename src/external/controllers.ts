import type { Request, Response } from 'express';
import type { UsecaseLayer } from '../internal/usecase';
import type { Opportunity, Organization, User } from '../internal/entity';

export class ControllerLayer {
	constructor(private usecase: UsecaseLayer) {}

	// User ---------------------------------------------------------------------------------------------

	login = async (req: Request, res: Response) => {
		let bodyReq = req.body as User;
		let response = await this.usecase.login(bodyReq.name, bodyReq.password);
		if (response) {
			req.session.user = {
				id: response._id! as string,
				email: response.email!,
				name: response.name!,
				password: response.password!,
			};
		}
		res.status(200).json(response);
	};

	register = async (req: Request, res: Response) => {
		let bodyReq = req.body as User;
		let response = await this.usecase.registerUser(bodyReq);
		res.status(200).json(response);
	};

	infoMeUser = async (req: Request, res: Response) => {
		let response = await this.usecase.infoMeUser(req.session.user!.id);
		res.status(200).json(response);
	};

	meApplys = async (req: Request, res: Response) => {
		let response = await this.usecase.meApplys(req.session.user!.id);
		res.status(200).json(response);
	};

	// Organization ---------------------------------------------------------------------------------------------

	saveOrganizations = async (req: Request, res: Response) => {
		let bodyReq = req.body as Organization;
		let response = await this.usecase.saveOrganizations(bodyReq);
		res.status(200).json(response);
	};

	getInfoOrganization = async (req: Request, res: Response) => {
		let paramReq = req.params.id as string;
		let response = await this.usecase.getInfoOrganization(paramReq);
		res.status(200).json(response);
	};

	editOrganization = async (req: Request, res: Response) => {
		let paramReq = req.params.id as string;
		let bodyReq = req.body as Partial<Organization>;
		let response = await this.usecase.editOrganization(paramReq, bodyReq);
		res.status(200).json(response);
	};

	// Opportunity ---------------------------------------------------------------------------------------------

	saveOpportunities = async (req: Request, res: Response) => {
		let bodyReq = req.body as Opportunity;
		let response = await this.usecase.saveOpportunities(bodyReq);
		res.status(200).json(response);
	};

	getOpportunityList = async (req: Request, res: Response) => {
		let response = await this.usecase.getOpportunityList();
		res.status(200).json(response);
	};

	matchmakingOpportunities = async (req: Request, res: Response) => {
		let response = await this.usecase.matchmakingOpportunities(
			req.session.user!.id
		);
		res.status(200).json(response);
	};

	applyOpportunity = async (req: Request, res: Response) => {
		let opportunityId = req.params.id as string;

		let response = await this.usecase.applyOpportunity(
			opportunityId,
			req.session.user!.id
		);
		res.status(200).json(response);
	};
}
