// src/components/ui/OutlineFillButton.jsx
import React from "react";
import styled from "styled-components";

export default function OutlineFillButton({
  children = "Hello",
  onClick,
  onClear,          // 🔹 called when the x is clicked
  active = false,   // 🔹 selected button
  dimmed = false,   // 🔹 fade/blur other buttons
  className = "",
}) {
  return (
    <StyledWrapper>
      <button
        className={`btn type1 ${active ? "is-active" : ""} ${dimmed ? "is-dimmed" : ""} ${className}`}
        onClick={onClick}
      >
        <span className="btn-txt">{children}</span>

        {/* Tiny x in the top-right only when active */}
        {active && (
          <span
            className="close-x"
            aria-label="Clear selection"
            onClick={(e) => {
              e.stopPropagation();     // don't trigger main onClick
              onClear?.();
            }}
          >
            {/* Font Awesome class if you’ve loaded FA, else use × */}
            <i className="fa-solid fa-xmark fa-lg" aria-hidden="true" />
          </span>
        )}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    max-width: 800px;
    position: relative;
    background: transparent;
    cursor: pointer;
    border: 2px solid var(--divider);
    color: var(--color-text);
    border-radius: 10px;
    overflow: hidden;
    transition: color .35s ease, border-color .35s ease, box-shadow .35s ease, filter .25s ease, opacity .25s ease;
  }

  .btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0,0,0,.2), 0 0 0 6px rgba(0,0,0,.1);
  }

  .btn-txt {
    position: relative;
    z-index: 1;
    font-weight: 700;
    letter-spacing: 0.05em;
    font-family: 'Space Grotesk', sans-serif;
  }

  /* fill-on-hover ripple */
  .type1::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 10px;
    height: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 30px;
    background: var(--color-text);
    transition: transform .5s cubic-bezier(.23,1,.32,1);
    z-index: 0;
  }

  .btn:hover {
    color: var(--color-bg);
    border-color: transparent;
    box-shadow: 0 8px 60px rgba(0,0,0,.15);
  }
  .btn:hover.type1::after {
    transform: translate(-50%, -50%) scale(40);
  }

  /* Active (selected) */
  .btn.is-active {
    background: #111;
    color: #fff;
    border-color: transparent;
  }
  .btn.is-active.type1::after {
    transform: scale(0);   /* disable ripple */
  }
  .btn.is-active:hover {
    color: #fff;
    box-shadow: 0 8px 40px rgba(0,0,0,.25);
  }

  /* Dimmed */
  .btn.is-dimmed {
    opacity: .35;
    filter: blur(1px);
    pointer-events: none;
  }

  /* Tiny X */
  .close-x {
    position: absolute;
    top: 6px;
    right: 8px;
    font-size: 14px;
    line-height: 1;
    z-index: 2;
    color: var(--color-bg);
    opacity: .7;
    transition: opacity .2s ease, transform .2s ease;
  }
  .close-x:hover {
    opacity: 1;
    transform: scale(1.1);
    cursor: pointer;
  }
`;
