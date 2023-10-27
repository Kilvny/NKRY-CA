'use client'
import React from "react";
import scss from "./Footer.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { Paper, useTheme } from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { data: session } = useSession();
  const theme = useTheme();
  const pathname = usePathname();
  const isOnNKRY_CA = pathname?.startsWith('/nkry-ca');

  const routes: string[] = ["/", "/dashboard", "/customer-service/invoices", "/dashboard/settings", "/#termsandconditions", "/#termsandconditions"]
  const routesTranslations: string[] = ["Home", "Dashboard", "Invoices", "Settings","Terms & Conditions", "Accessibility statement"]

  const FooterLink = styled(Link)`
    color: ${theme.palette.text.primary};
  `;

  return (
    <footer className={scss.footer}>
      <Paper sx={{ width: "100%" }} color={"#262626"}>
        <ul role="menu">
          {
            routes.map((route, index) => {
              isOnNKRY_CA ? route = "/nkry-ca" + route : route = "/workers-manager" + route;
              if(index === 0) route = "/" // we want the home route without the section prefix
              return (<li key={index}>
                <FooterLink href={route}>{routesTranslations[index]}</FooterLink>
              </li>)
            })
          }
          {/* <li>
            <FooterLink href={"/"}>Home</FooterLink>
          </li>
          <li>
            <FooterLink href={"/dashboard/data"}>Data</FooterLink>
          </li>
          <li>
            <FooterLink href={"/dashboard/profile"}>Profile</FooterLink>
          </li>
          <li>
            <FooterLink href={"/dashboard/settings"}>Settings</FooterLink>
          </li>
          <li>
            <FooterLink href={"/#termsandconditions"}>
              Terms & Conditions
            </FooterLink>
          </li>
          <li>
            <FooterLink href={"/#accessibilitystatement"}>
              Accessibility statement
            </FooterLink>
          </li> */}
          {/* <li>
            <Button
              variant={"text"}
              color={session ? "error" : "success"}
              onClick={() => (session ? signOut() : signIn())}
            >
              {session ? "Sign Out" : "Sign In"}
            </Button>
          </li> */}
        </ul>
      </Paper>
    </footer>
  );
};

export default Footer;