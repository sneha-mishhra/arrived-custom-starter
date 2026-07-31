"use client";

import { useActionState, useEffect } from "react";

import {
  type RegistrationState,
  submitRegistration,
} from "@/app/actions/register";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  HappilyEnv,
  PublicForm,
  RegistrationFormType,
} from "@/lib/happily/types";

type RegistrationFormProps = {
  eventId: string;
  env: HappilyEnv;
  form: PublicForm;
  formType?: RegistrationFormType;
  redirectTo?: string;
  buttonText?: string | null;
  onSuccess?: () => void;
};

const initialState: RegistrationState = {
  ok: false,
};

export function RegistrationForm({
  eventId,
  env,
  form,
  formType = 2,
  redirectTo,
  buttonText,
  onSuccess,
}: RegistrationFormProps) {
  const action = submitRegistration.bind(null, {
    eventId,
    env,
    formId: form.id,
    formType,
    redirectTo,
  });
  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.ok && onSuccess) {
      onSuccess();
    }
  }, [state.ok, onSuccess]);

  if (!form.is_active) {
    return (
      <p className="rounded-(--event-border-radius) border border-(--event-base-text)/10 bg-(--event-base-bg)/70 p-4 text-sm">
        Registration is currently closed.
      </p>
    );
  }

  if (form.at_capacity) {
    return (
      <p className="rounded-(--event-border-radius) border border-(--event-base-text)/10 bg-(--event-base-bg)/70 p-4 text-sm">
        Registration is at capacity.
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-lg flex-col gap-4 text-left"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="first_name">First name *</Label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            required
            placeholder="First name"
            autoComplete="given-name"
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="last_name">Last name *</Label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            required
            placeholder="Last name"
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="company">What company do you work for? *</Label>
        <Input
          id="company"
          name="company"
          type="text"
          required
          placeholder="Company name"
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="job_title">What is your job title? *</Label>
        <Input
          id="job_title"
          name="job_title"
          type="text"
          required
          placeholder="Job title"
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="linkedin_url">What is your LinkedIn profile?</Label>
        <Input
          id="linkedin_url"
          name="linkedin_url"
          type="url"
          placeholder="https://linkedin.com/in/…"
        />
      </div>

      <div className="mt-2 flex items-start gap-3">
        <Checkbox id="marketing_opt_in" name="marketing_opt_in" value="yes" />
        <Label
          htmlFor="marketing_opt_in"
          className="text-sm font-normal leading-relaxed"
        >
          I agree to receive marketing emails about future events from Flagright.
        </Label>
      </div>

      {state.message ? (
        <p
          className={`rounded-md p-3 text-sm ${
            state.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-(--event-primary-bg) px-4 py-3 font-(family-name:--font-space-mono) text-xs font-bold uppercase tracking-[0.12em] text-(--event-primary-text) transition-opacity hover:bg-(--event-primary-bg) hover:opacity-90"
      >
        {isPending ? "Submitting…" : buttonText || "Request to Join"}
        <span aria-hidden="true">↗</span>
      </Button>
    </form>
  );
}
