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

        createMany: procedure.input($Schema.ExperienceInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).experience.createMany(input as any))),

        create: procedure.input($Schema.ExperienceInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).experience.create(input as any))),

        deleteMany: procedure.input($Schema.ExperienceInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).experience.deleteMany(input as any))),

        delete: procedure.input($Schema.ExperienceInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).experience.delete(input as any))),

        findFirst: procedure.input($Schema.ExperienceInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).experience.findFirst(input as any))),

        findMany: procedure.input($Schema.ExperienceInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).experience.findMany(input as any))),

        findUnique: procedure.input($Schema.ExperienceInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).experience.findUnique(input as any))),

        updateMany: procedure.input($Schema.ExperienceInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).experience.updateMany(input as any))),

        update: procedure.input($Schema.ExperienceInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).experience.update(input as any))),

        count: procedure.input($Schema.ExperienceInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).experience.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ExperienceCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExperienceCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExperienceCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExperienceCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ExperienceCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExperienceCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExperienceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExperienceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExperienceCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExperienceCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExperienceGetPayload<T>, Context>) => Promise<Prisma.ExperienceGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ExperienceDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExperienceDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExperienceDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExperienceDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ExperienceDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExperienceDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExperienceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExperienceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExperienceDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExperienceDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExperienceGetPayload<T>, Context>) => Promise<Prisma.ExperienceGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ExperienceFindFirstArgs, TData = Prisma.ExperienceGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ExperienceFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ExperienceGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExperienceFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ExperienceFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ExperienceGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ExperienceGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ExperienceFindManyArgs, TData = Array<Prisma.ExperienceGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ExperienceFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ExperienceGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExperienceFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ExperienceFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ExperienceGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ExperienceGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ExperienceFindUniqueArgs, TData = Prisma.ExperienceGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ExperienceFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ExperienceGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ExperienceFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ExperienceFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ExperienceGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ExperienceGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ExperienceUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExperienceUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExperienceUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExperienceUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ExperienceUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ExperienceUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ExperienceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ExperienceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ExperienceUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ExperienceUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ExperienceGetPayload<T>, Context>) => Promise<Prisma.ExperienceGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ExperienceCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ExperienceCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ExperienceCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ExperienceCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ExperienceCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ExperienceCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ExperienceCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ExperienceCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
