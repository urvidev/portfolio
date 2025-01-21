/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createBlogPostRouter from "./BlogPost.router";
import createCommentRouter from "./Comment.router";
import createPortfolioProjectRouter from "./PortfolioProject.router";
import createExperienceRouter from "./Experience.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as BlogPostClientType } from "./BlogPost.router";
import { ClientType as CommentClientType } from "./Comment.router";
import { ClientType as PortfolioProjectClientType } from "./PortfolioProject.router";
import { ClientType as ExperienceClientType } from "./Experience.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        blogPost: createBlogPostRouter(router, procedure),
        comment: createCommentRouter(router, procedure),
        portfolioProject: createPortfolioProjectRouter(router, procedure),
        experience: createExperienceRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    blogPost: BlogPostClientType<AppRouter>;
    comment: CommentClientType<AppRouter>;
    portfolioProject: PortfolioProjectClientType<AppRouter>;
    experience: ExperienceClientType<AppRouter>;
}
