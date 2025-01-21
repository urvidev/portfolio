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

        createMany: procedure.input($Schema.CommentInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).comment.createMany(input as any))),

        create: procedure.input($Schema.CommentInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).comment.create(input as any))),

        deleteMany: procedure.input($Schema.CommentInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).comment.deleteMany(input as any))),

        delete: procedure.input($Schema.CommentInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).comment.delete(input as any))),

        findFirst: procedure.input($Schema.CommentInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).comment.findFirst(input as any))),

        findMany: procedure.input($Schema.CommentInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).comment.findMany(input as any))),

        findUnique: procedure.input($Schema.CommentInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).comment.findUnique(input as any))),

        updateMany: procedure.input($Schema.CommentInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).comment.updateMany(input as any))),

        update: procedure.input($Schema.CommentInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).comment.update(input as any))),

        count: procedure.input($Schema.CommentInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).comment.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CommentCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CommentCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommentGetPayload<T>, Context>) => Promise<Prisma.CommentGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CommentDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CommentDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommentGetPayload<T>, Context>) => Promise<Prisma.CommentGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CommentFindFirstArgs, TData = Prisma.CommentGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CommentFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommentFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommentFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CommentFindManyArgs, TData = Array<Prisma.CommentGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CommentFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CommentGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommentFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommentFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CommentGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CommentGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CommentFindUniqueArgs, TData = Prisma.CommentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CommentFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommentFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CommentFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CommentUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CommentUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommentGetPayload<T>, Context>) => Promise<Prisma.CommentGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CommentCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommentCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CommentCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CommentCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CommentCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CommentCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CommentCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommentCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
