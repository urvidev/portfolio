/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.PortfolioProjectInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).portfolioProject.createMany(input as any))),

        create: procedure.input($Schema.PortfolioProjectInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).portfolioProject.create(input as any))),

        deleteMany: procedure.input($Schema.PortfolioProjectInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).portfolioProject.deleteMany(input as any))),

        delete: procedure.input($Schema.PortfolioProjectInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).portfolioProject.delete(input as any))),

        findFirst: procedure.input($Schema.PortfolioProjectInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).portfolioProject.findFirst(input as any))),

        findMany: procedure.input($Schema.PortfolioProjectInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).portfolioProject.findMany(input as any))),

        findUnique: procedure.input($Schema.PortfolioProjectInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).portfolioProject.findUnique(input as any))),

        updateMany: procedure.input($Schema.PortfolioProjectInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).portfolioProject.updateMany(input as any))),

        update: procedure.input($Schema.PortfolioProjectInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).portfolioProject.update(input as any))),

        count: procedure.input($Schema.PortfolioProjectInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).portfolioProject.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PortfolioProjectCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PortfolioProjectCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PortfolioProjectCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PortfolioProjectCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PortfolioProjectCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PortfolioProjectCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PortfolioProjectGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PortfolioProjectGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PortfolioProjectCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PortfolioProjectCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PortfolioProjectGetPayload<T>, Context>) => Promise<Prisma.PortfolioProjectGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PortfolioProjectDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PortfolioProjectDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PortfolioProjectDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PortfolioProjectDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PortfolioProjectDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PortfolioProjectDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PortfolioProjectGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PortfolioProjectGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PortfolioProjectDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PortfolioProjectDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PortfolioProjectGetPayload<T>, Context>) => Promise<Prisma.PortfolioProjectGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PortfolioProjectFindFirstArgs, TData = Prisma.PortfolioProjectGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PortfolioProjectFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PortfolioProjectGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PortfolioProjectFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PortfolioProjectFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PortfolioProjectGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PortfolioProjectGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PortfolioProjectFindManyArgs, TData = Array<Prisma.PortfolioProjectGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PortfolioProjectFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PortfolioProjectGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PortfolioProjectFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PortfolioProjectFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PortfolioProjectGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PortfolioProjectGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PortfolioProjectFindUniqueArgs, TData = Prisma.PortfolioProjectGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PortfolioProjectFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PortfolioProjectGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PortfolioProjectFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PortfolioProjectFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PortfolioProjectGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PortfolioProjectGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PortfolioProjectUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PortfolioProjectUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PortfolioProjectUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PortfolioProjectUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PortfolioProjectUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PortfolioProjectUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PortfolioProjectGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PortfolioProjectGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PortfolioProjectUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PortfolioProjectUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PortfolioProjectGetPayload<T>, Context>) => Promise<Prisma.PortfolioProjectGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PortfolioProjectCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PortfolioProjectCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PortfolioProjectCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PortfolioProjectCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PortfolioProjectCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PortfolioProjectCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PortfolioProjectCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PortfolioProjectCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
