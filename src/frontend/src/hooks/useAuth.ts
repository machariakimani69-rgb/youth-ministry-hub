import { createActor } from "@/backend";
import { UserRole } from "@/types";
import type { UserProfile } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    if (!isAuthenticated) login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const isDisabled = isInitializing || isLoggingIn;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isDisabled,
    identity,
    login: handleLogin,
    logout: handleLogout,
  };
}

export function useCallerProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  const query = useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useIsAdmin() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    staleTime: 30_000,
  });
}

export function useUserRole() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  const { data: profile } = useCallerProfile();

  const role: UserRole = profile?.role ?? UserRole.guest;

  const isAdmin = role === UserRole.admin;
  const isLeader = role === UserRole.leader || isAdmin;
  const isMember = role === UserRole.member || isLeader;

  return {
    role,
    isAdmin,
    isLeader,
    isMember,
    actorReady: !!actor && !actorFetching && isAuthenticated,
  };
}

export function useSaveProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
    }: {
      name: string;
      email: string;
      phone: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(name, email, phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}
